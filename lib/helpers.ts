import beautify from "js-beautify";

// React Native SVG to SVG tag mappings
const RN_SVG_TAG_MAPPINGS: Record<string, string> = {
  Svg: "svg",
  Circle: "circle",
  Rect: "rect",
  Path: "path",
  Line: "line",
  Polyline: "polyline",
  Polygon: "polygon",
  Ellipse: "ellipse",
  G: "g",
  Text: "text",
  TSpan: "tspan",
  Defs: "defs",
  LinearGradient: "linearGradient",
  RadialGradient: "radialGradient",
  Stop: "stop",
  ClipPath: "clipPath",
  Mask: "mask",
  Use: "use",
  Symbol: "symbol",
  Marker: "marker",
  Pattern: "pattern",
  Image: "image",
  ForeignObject: "foreignObject",
};

// Common SVG attribute mappings (camelCase to kebab-case)
const SVG_ATTRIBUTE_MAPPINGS: Record<string, string> = {
  strokeWidth: "stroke-width",
  strokeLinecap: "stroke-linecap",
  strokeLinejoin: "stroke-linejoin",
  strokeDasharray: "stroke-dasharray",
  strokeDashoffset: "stroke-dashoffset",
  strokeMiterlimit: "stroke-miterlimit",
  strokeOpacity: "stroke-opacity",
  fillOpacity: "fill-opacity",
  fillRule: "fill-rule",
  clipRule: "clip-rule",
  clipPath: "clip-path",
  fontFamily: "font-family",
  fontSize: "font-size",
  fontWeight: "font-weight",
  fontStyle: "font-style",
  textAnchor: "text-anchor",
  textDecoration: "text-decoration",
  dominantBaseline: "dominant-baseline",
  alignmentBaseline: "alignment-baseline",
  baselineShift: "baseline-shift",
  vectorEffect: "vector-effect",
  shapeRendering: "shape-rendering",
  colorInterpolation: "color-interpolation",
  colorInterpolationFilters: "color-interpolation-filters",
  colorRendering: "color-rendering",
  // The ones below stay camelCase in SVG
  gradientUnits: "gradientUnits",
  gradientTransform: "gradientTransform",
  patternUnits: "patternUnits",
  patternContentUnits: "patternContentUnits",
  preserveAspectRatio: "preserveAspectRatio",
  viewBox: "viewBox",
};

// Add this function after the RN_SVG_TAG_MAPPINGS constant
const convertCamelCaseToKebabCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const convert = (
  code: string,
  storeDimensions?: (dimensions: { width: string; height: string }) => void,
  storeFileName?: (fileName: string) => void
): string => {
  try {
    let converted = code.trim();

    if (storeFileName) {
      // Extract component name for different declaration patterns
      let componentName;
      const functionCompMatch = converted.match(/function\s+(\w+)\s*\(/);
      const constCompMatch = converted.match(
        /const\s+(\w+)\s*=\s*(\([^)]*\)\s*=>\s*|React\.forwardRef|React\.memo)/
      );
      const exportConstMatch = converted.match(/export\s+const\s+(\w+)\s*=/);
      const exportDefaultFuncMatch = converted.match(
        /export\s+default\s+function\s+(\w+)/
      );
      const exportDefaultMatch = converted.match(/export\s+default\s+(\w+)/);

      if (functionCompMatch) componentName = functionCompMatch[1];
      else if (constCompMatch) componentName = constCompMatch[1];
      else if (exportConstMatch) componentName = exportConstMatch[1];
      else if (exportDefaultFuncMatch)
        componentName = exportDefaultFuncMatch[1];
      else if (exportDefaultMatch) componentName = exportDefaultMatch[1];

      if (componentName?.trim().length) {
        storeFileName(
          convertCamelCaseToKebabCase(componentName).toLowerCase() + ".svg"
        );
      }
    }

    // Extract content between <Svg> tags (inclusive)
    const svgMatch = converted.match(/<Svg[\s\S]*?<\/Svg>/i);
    if (svgMatch) {
      converted = svgMatch[0];
    }

    // remove any comments starting with "//" or "/*" or "{/*" and ending with "*/" or "*/}"
    converted = converted.replace(
      /\/\/.*|\/\*[\s\S]*?\*\/|\{\/\*[\s\S]*?\*\/\}/g,
      ""
    );

    // Convert React Native SVG tags to standard SVG tags
    Object.entries(RN_SVG_TAG_MAPPINGS).forEach(([rnTag, svgTag]) => {
      const openTagRegex = new RegExp(`<${rnTag}(\\s|>)`, "g");
      const closeTagRegex = new RegExp(`</${rnTag}>`, "g");
      converted = converted.replace(openTagRegex, `<${svgTag}$1`);
      converted = converted.replace(closeTagRegex, `</${svgTag}>`);
    });

    // Extract viewBox values for size calculations
    const viewBoxMatch = converted.match(/viewBox=["']([^"']+)["']/i);
    let viewBoxWidth = "24";
    let viewBoxHeight = "24";
    if (viewBoxMatch) {
      const viewBoxValues = viewBoxMatch[1].split(/\s+/);
      if (viewBoxValues.length >= 4) {
        viewBoxWidth = viewBoxValues[2];
        viewBoxHeight = viewBoxValues[3];
        storeDimensions?.({ width: viewBoxWidth, height: viewBoxHeight });
      }
    }

    // Handle size prop and variable replacements in width/height
    converted = converted.replace(/<svg([^>]*?)>/gi, (match, attributes) => {
      let attrs = attributes;

      // Replace size prop with actual dimensions
      attrs = attrs.replace(/size=\{?(\w+|\d+)\}?/gi, "");

      // Replace width={size} or width={variable} with actual width
      attrs = attrs.replace(/width=\{[^}]+\}/gi, `width="${viewBoxWidth}"`);

      // Replace height={size} or height={variable} with actual height
      attrs = attrs.replace(/height=\{[^}]+\}/gi, `height="${viewBoxHeight}"`);

      // If no width/height specified but size was used, add them
      if (!attrs.includes("width=") && converted.includes("size=")) {
        attrs += ` width="${viewBoxWidth}"`;
      }
      if (!attrs.includes("height=") && converted.includes("size=")) {
        attrs += ` height="${viewBoxHeight}"`;
      }

      return `<svg${attrs} xmlns="http://www.w3.org/2000/svg">`;
    });

    // Remove ...props references
    converted = converted.replace(/\{\.\.\.props\}/g, "");
    converted = converted.replace(/\.\.\.props,?\s*/g, "");

    // Replace color and backgroundColor props with currentColor
    converted = converted.replace(/color=\{[^}]*\}/gi, 'fill="currentColor"');
    converted = converted.replace(
      /backgroundColor=\{[^}]*\}/gi,
      'fill="currentColor"'
    );
    converted = converted.replace(/fill=\{color\}/gi, 'fill="currentColor"');
    converted = converted.replace(
      /stroke=\{color\}/gi,
      'stroke="currentColor"'
    );

    // Handle other common variable patterns
    converted = converted.replace(/fill=\{[^}]+\}/gi, 'fill="currentColor"');
    converted = converted.replace(
      /stroke=\{[^}]+\}/gi,
      'stroke="currentColor"'
    );

    // Clean up JSX expressions in attributes - convert simple ones to strings
    converted = converted.replace(/=\{([^}]+)\}/g, (match, content) => {
      // If it's a simple string, remove quotes and braces
      if (/^["'].*["']$/.test(content)) {
        return `=${content}`;
      }
      // If it's a simple number, wrap in quotes
      if (/^[\d.]+$/.test(content)) {
        return `="${content}"`;
      }
      // For variables or expressions, try to handle common cases
      if (content === "size" || content.includes("size")) {
        return `="${viewBoxWidth}"`; // Default to width for size
      }
      return match;
    });

    // Convert camelCase attributes to kebab-case (add this after JSX cleanup)
    converted = converted.replace(/(\w+)=/g, (match, attrName) => {
      // Check if we have a specific mapping
      if (SVG_ATTRIBUTE_MAPPINGS.hasOwnProperty(attrName)) {
        return `${SVG_ATTRIBUTE_MAPPINGS[attrName]}=`;
      }

      // For attributes that should stay camelCase in SVG, don't convert
      const keepCamelCase = [
        "viewBox",
        "preserveAspectRatio",
        "gradientUnits",
        "gradientTransform",
        "patternUnits",
        "patternContentUnits",
        "clipPathUnits",
        "maskUnits",
        "maskContentUnits",
        "primitiveUnits",
        "markerUnits",
        "markerWidth",
        "markerHeight",
        "refX",
        "refY",
        "patternTransform",
        "filterUnits",
        "primitiveUnits",
      ];

      if (keepCamelCase.includes(attrName)) {
        return match;
      }

      // Convert other camelCase attributes to kebab-case
      const kebabCase = convertCamelCaseToKebabCase(attrName);
      return kebabCase !== attrName ? `${kebabCase}=` : match;
    });

    // Clean up extra spaces and formatting
    converted = converted.replace(/\s+/g, " ");
    converted = converted.trim();

    return converted;
  } catch (err) {
    throw new Error(
      `Conversion failed: ${
        err instanceof Error ? err.message : "Unknown error"
      }`
    );
  }
};

export const prettify = (svg: string): string => {
  try {
    const formatted = beautify.html(svg, {
      indent_size: 2,
      indent_char: " ",
      max_preserve_newlines: 1,
      preserve_newlines: true,
      indent_scripts: "normal",
      end_with_newline: false,
      wrap_line_length: 120,
      indent_inner_html: true,
      indent_empty_lines: false,
    });
    return formatted;
  } catch (error) {
    console.warn("Failed to format SVG with js-beautify:", error);
    return svg;
  }
};
