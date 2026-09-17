import type { Lesson } from "../types";

/** Design — foundations, Figma, Adobe and challenge briefs. */
export const designLessons: Lesson[] = [
  {
    id: "design-colour-and-contrast",
    title: "Colour & Contrast That Actually Works",
    subjectId: "design",
    unitId: "design-foundations",
    track: "design",
    summary:
      "Build a colour system with a palette, tints and shades — and learn the contrast rules that keep designs readable.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 130,
    tags: ["Colour", "Accessibility", "Design foundations"],
    objectives: [
      "Explain hue, saturation and lightness",
      "Build a five-colour palette with tints and shades",
      "Check contrast ratios for accessible text",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Colour is the fastest way to make a design feel like something. It is also the fastest way to make it unreadable. Professional designers fix the second problem first.",
          "Every colour on a screen is described by three numbers: **hue** (which colour), **saturation** (how vivid) and **lightness** (how bright). Change lightness and you get the tints and shades that give a design depth.",
        ],
      },
      {
        type: "table",
        title: "Your starter palette",
        headers: ["Role", "Example", "Where it is used"],
        rows: [
          ["Primary", "#6366F1 indigo", "Main buttons, links, active states"],
          ["Secondary", "#22D3EE cyan", "Highlights, charts, secondary buttons"],
          ["Accent", "#F472B6 pink", "Notifications, badges, playful details"],
          ["Neutral dark", "#0F172A", "Text and dark backgrounds"],
          ["Neutral light", "#F8FAFC", "Page background, cards"],
        ],
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "The 60-30-10 rule",
        body: "Use your neutral 60% of the time, your primary colour 30%, and your accent just 10%. Designs that follow this rule look calm; designs that skip it look like a fairground.",
      },
      {
        type: "steps",
        title: "Build it: a colour system in Figma",
        steps: [
          {
            title: "Create five swatches",
            body: "Draw five 120×120 rectangles in a row. Fill them with your base hues. Use the colour picker's hex field for exact values.",
          },
          {
            title: "Generate tints and shades",
            body: "Duplicate each swatch and change only the lightness: three lighter (tints) and three darker (shades). Name them `/Primary/500`, `/Primary/100` and so on.",
            code: "Primary/900  #312E81\nPrimary/700  #4338CA\nPrimary/500  #6366F1   ← the base you click\nPrimary/300  #A5B4FC\nPrimary/100  #E0E7FF",
          },
          {
            title: "Name your styles",
            body: "Select each swatch and press the four-dot icon to create a **colour style**. Styles mean one change updates the whole file later — the difference between a sketch and a system.",
          },
          {
            title: "Test contrast",
            body: "Put white text on your Primary/500. Does it pass? Use a contrast checker: body text needs a ratio of at least **4.5:1**, large headings at least **3:1**.",
          },
          {
            title: "Check colour-blind safety",
            body: "Turn on a deuteranopia filter and look again. Red/Green-only signals break for 1 in 12 boys. Always pair colour with an icon, label or shape.",
          },
        ],
      },
      {
        type: "widget",
        widget: "designCanvas",
        title: "Play with a live palette",
        caption:
          "Drag the shapes, change the fill and see how a colour system behaves across a small screen composition.",
        config: { mode: "palette" },
      },
      {
        type: "compare",
        title: "Same layout, two colour choices",
        columns: [
          {
            title: "Working palette",
            tone: "good",
            items: [
              "One dominant neutral background",
              "Primary colour for the single main action",
              "Accent used only for small highlights",
              "Text contrast at 4.5:1 or better",
            ],
          },
          {
            title: "Colour chaos",
            tone: "bad",
            items: [
              "Five competing bright colours",
              "Three buttons, all shouting equally",
              "Grey text on a pastel background",
              "Colour as the only signal for meaning",
            ],
          },
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Steal like a designer, legally",
        body: "Collect palettes from sites you admire into a 'swipe file' — but always rebuild them in your own proportions. Copying proportions is study; copying designs is stealing.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "What is a 'tint' of a colour?",
        options: [
          "The same hue made lighter",
          "The same hue made darker",
          "A completely different hue",
          "The opposite colour on the wheel",
        ],
        answer: 0,
        explanation:
          "Tints add white (lighter); shades add black (darker). Together they create a full colour family.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "Body text should reach a contrast ratio of at least _______ to 1.",
        answer: ["4.5", "4.5:1"],
        explanation:
          "WCAG AA requires 4.5:1 for normal text and 3:1 for large text (18 pt+ or bold 14 pt+).",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "Colour should be the only way you communicate an error, like a red border.",
        answer: false,
        explanation:
          "Always pair colour with an icon or text so colour-blind users receive the same information.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "In the 60-30-10 rule, what does the 10 represent?",
        options: [
          "The neutral background",
          "The primary colour",
          "The accent colour used sparingly",
          "The font size",
        ],
        answer: 2,
        explanation:
          "The accent is used sparingly, which is exactly why it draws the eye to what matters.",
        points: 20,
      },
    ],
    updatedAt: "2026-08-30",
    author: "Ms. Kirana Dewi · Design Lead",
  },
  {
    id: "figma-frames-and-shapes",
    title: "Figma: Frames, Shapes and Your First Screen",
    subjectId: "design",
    unitId: "figma",
    track: "design",
    summary:
      "Learn the three tools that do 80% of the work in Figma — frames, shapes and alignment — by building a login screen.",
    difficulty: "Beginner",
    minutes: 25,
    xp: 150,
    tags: ["Figma", "UI design", "Frames", "Layout"],
    objectives: [
      "Create frames at real device sizes",
      "Draw, resize and align shapes precisely",
      "Structure a screen with nesting and names",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Figma is a design tool that runs in the browser and lets several people edit the same file at once. Under the surface, everything you build is made of two things: **frames** (containers) and **layers** inside them.",
          "A frame on the canvas is a rectangle; a frame with a device size is a screen. Everything in UI design lives inside frames, which is why this lesson starts there.",
        ],
      },
      {
        type: "table",
        title: "Frame sizes you will use all the time",
        headers: ["Device", "Width", "Height", "Notes"],
        rows: [
          ["iPhone 15", "393 px", "852 px", "Most common phone preset"],
          ["Android (Pixel)", "412 px", "915 px", "Slightly wider"],
          ["Desktop", "1440 px", "1024 px", "Design at 1440, scale down later"],
          ["Tablet", "834 px", "1112 px", "Good for two-column layouts"],
        ],
      },
      {
        type: "steps",
        title: "Build it: a login screen",
        steps: [
          {
            title: "Create the frame",
            body: "Press **F**, then choose *iPhone 15* from the preset list on the right. Rename the frame `Login / Default` in the layers panel. Naming is not decoration — it is how you and your team find things.",
          },
          {
            title: "Set the background",
            body: "Give the frame a fill of `#0F172A` and add 24 px of padding using the auto-layout panel (we will go deeper on auto layout in the next lesson).",
          },
          {
            title: "Add the logo mark",
            body: "Draw an **ellipse** (press O) holding Shift for a perfect circle: 72 × 72. Fill it with a linear gradient from `#6366F1` to `#22D3EE`.",
          },
          {
            title: "Add the title and subtitle",
            body: "Press **T** for text. Set the title to 28 px bold and the subtitle to 14 px in a muted grey. Text layers should always sit inside the frame so they move with it.",
          },
          {
            title: "Make the input fields",
            body: "Draw a rectangle 345 × 48, radius 12, fill `#1E293B`, then add a text layer inside reading 'Email address'. Duplicate it (Ctrl/Cmd + D) for the password field.",
          },
          {
            title: "Add the primary button",
            body: "Another rectangle, 345 × 48, radius 12, fill `#6366F1`, with white 15 px semibold text reading 'Log in'. Centre the text with the alignment tools — not by eye.",
          },
          {
            title: "Align everything",
            body: "Select all layers and use **Distribute vertical spacing** so the gaps are exactly equal. Consistent spacing is what separates a screen that feels professional from one that feels 'almost right'.",
          },
        ],
      },
      {
        type: "widget",
        widget: "designCanvas",
        title: "Prototype it here",
        caption:
          "This mini canvas works like a simplified Figma: click to add shapes and text, drag to move, and use the inspector to change colour, size and radius.",
        config: { mode: "canvas" },
      },
      {
        type: "keyTerms",
        terms: [
          { term: "Frame", definition: "A container that clips its children and can be resized to any device size." },
          { term: "Layer", definition: "Any element in your file — shapes, text, images, frames — listed in the layers panel." },
          { term: "Padding", definition: "The space between a container's edge and its content." },
          { term: "Boolean", definition: "Combining shapes with union, subtract, intersect or exclude to make new forms." },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Nested frames vs floating groups",
        body: "If two elements should move together forever, put them in the same frame. Groups float loose and break as soon as content changes; frames hold structure.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Keyboard shortcuts that save hours",
        body: "**F** frame · **R** rectangle · **O** ellipse · **T** text · **K** scale · **Ctrl/Cmd + D** duplicate · **Shift + A** add auto layout · **Alt/Option + drag** duplicate while dragging.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Which shortcut creates a new frame in Figma?",
        options: ["F", "R", "T", "V"],
        answer: 0,
        explanation: "**F** creates a frame, **R** a rectangle, **T** a text layer and **V** the move tool.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "The space between a container's edge and its content is called _______.",
        answer: ["padding", "inner spacing"],
        explanation: "Padding inside a frame, margin outside it. Naming them correctly keeps handoff clear.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "Groups and frames behave identically in Figma.",
        answer: false,
        explanation:
          "Frames clip content, support layout and can be sized as devices. Groups are loose selections that resize with their contents.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "A frame is 345 px wide with 24 px padding on both sides. How wide is the content area?",
        options: ["321 px", "297 px", "369 px", "345 px"],
        answer: 1,
        explanation: "345 − (24 × 2) = 297 px of usable content width.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-03",
    author: "Ms. Kirana Dewi · Design Lead",
  },
  {
    id: "figma-auto-layout",
    title: "Figma: Auto Layout & Components",
    subjectId: "design",
    unitId: "figma",
    track: "design",
    summary:
      "Turn static screens into flexible systems with auto layout, then build reusable components with variants.",
    difficulty: "Intermediate",
    minutes: 30,
    xp: 190,
    tags: ["Figma", "Auto Layout", "Components", "Design system"],
    objectives: [
      "Apply auto layout with padding and gap",
      "Resize content without breaking the layout",
      "Create a component with variants and properties",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "**Auto layout** is what makes a Figma file behave like a real interface. Instead of dragging things to positions, you describe relationships: this sits next to that, with 12 px between them, 16 px of padding, and the row grows when the text gets longer.",
          "Once you think in auto layout, resizing a card to fit a longer product name takes zero effort — and that is exactly what a real app must do in seven languages.",
        ],
      },
      {
        type: "compare",
        title: "Manual positioning vs auto layout",
        columns: [
          {
            title: "Manual",
            tone: "bad",
            items: [
              "Every element dragged to fixed x/y coordinates",
              "Text change breaks the whole screen",
              "No responsive behaviour",
              "Handoff to developers is guesswork",
            ],
          },
          {
            title: "Auto layout",
            tone: "good",
            items: [
              "Direction, padding, gap and alignment defined once",
              "Frames hug their content or fill their parents",
              "Resizing Just Works",
              "Developers read the exact spacing values",
            ],
          },
        ],
      },
      {
        type: "steps",
        title: "Build it: a course card component",
        steps: [
          {
            title: "Group the pieces",
            body: "Select the thumbnail, title, description and meta row. Press **Shift + A** to wrap them in auto layout. Figma guesses a vertical stack, which is what we want.",
            code: "Direction: vertical\nGap: 12\nPadding: 16 (all sides)",
          },
          {
            title: "Set hug and fill",
            body: "Set the container height to **Hug contents** and the width to **Fill container**. Now the card stretches to its parent but stays exactly as tall as its content needs.",
          },
          {
            title: "Add the meta row",
            body: "The bottom row ('12 lessons · 20 min') needs horizontal layout: select those three items, press **Shift + A**, set direction to horizontal, and use *Space between* to push the badge to the right edge.",
          },
          {
            title: "Turn it into a component",
            body: "Press **Ctrl/Cmd + Alt/Option + K**. The purple outline means any edit now propagates to every instance. Rename it `Card / Course`.",
          },
          {
            title: "Add variants for states",
            body: "In the right panel click **+ Add variant** and create `State = Default`, `State = Hover`, `State = Locked`. Change only what differs between them.",
          },
          {
            title: "Expose a text property",
            body: "Select the title, then choose **Create text property**. Now teammates can change the course name without entering the component — the single biggest time-saver in large files.",
          },
          {
            title: "Stress test it",
            body: "Paste a very long course name and a very short one. If the layout holds both without overlapping, it will hold real data too.",
            hint: "Try the name 'Advanced Micro:bit Robotics: Sensors, Motors & Radio Communication'.",
          },
        ],
      },
      {
        type: "widget",
        widget: "designCanvas",
        title: "See what auto layout feels like",
        caption:
          "Add cards, change the gap and padding, and watch every element reposition itself around the rules instead of fixed coordinates.",
        config: { mode: "canvas", layout: "auto" },
      },
      {
        type: "table",
        title: "Spacing scale to reuse everywhere",
        headers: ["Token", "Value", "Typical use"],
        rows: [
          ["space-1", "4 px", "Icon to label"],
          ["space-2", "8 px", "Between tightly related items"],
          ["space-3", "12 px", "Inside a card, list rows"],
          ["space-4", "16 px", "Card padding"],
          ["space-6", "24 px", "Between sections"],
          ["space-8", "32 px", "Page margins on desktop"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Design tokens are just names",
        body: "A token is a named value — `space-4` instead of `16`. When your whole team uses tokens, spacing becomes consistent automatically and rebranding takes minutes.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Naming convention",
        body: "Name components `Category / Name / Variant` — for example `Card / Course / Compact`. Figma turns these into a tidy nested menu in the assets panel.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Which shortcut wraps a selection in auto layout?",
        options: ["Shift + A", "Ctrl + G", "Alt + L", "Shift + C"],
        answer: 0,
        explanation: "Shift + A adds auto layout. Ctrl/Cmd + G creates a group, which is not the same thing.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "Setting a frame height to ______ contents makes it grow and shrink with what is inside it.",
        answer: ["hug", "hug contents"],
        explanation: "Hug fits the frame to its children; Fill makes it stretch to its parent.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "Editing a main component updates every instance of it.",
        answer: true,
        explanation:
          "That is the core benefit of components — change once, everywhere follows, unless an instance has been detached.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "A card has 12 px padding on every side and 3 stacked items of 20 px, separated by 8 px gaps. What is the total height?",
        options: ["76 px", "84 px", "100 px", "108 px"],
        answer: 2,
        explanation:
          "Content = (20 × 3) + (8 × 2) = 76 px. Padding adds 12 px top and bottom, so 76 + 24 = 100 px.",
        points: 25,
      },
    ],
    updatedAt: "2026-09-07",
    author: "Ms. Kirana Dewi · Design Lead",
  },
  {
    id: "illustrator-vector-logo",
    title: "Adobe Illustrator: Vector Basics & Logo Design",
    subjectId: "design",
    unitId: "adobe",
    track: "design",
    summary:
      "Understand why vectors never pixelate, then design a clean geometric logo with shapes and the pen tool.",
    difficulty: "Intermediate",
    minutes: 30,
    xp: 180,
    tags: ["Illustrator", "Vector", "Logo design", "Pen tool"],
    objectives: [
      "Explain the difference between raster and vector graphics",
      "Build a geometric logo from primitives",
      "Use the pen tool to draw custom curves",
    ],
    blocks: [
      {
        type: "text",
        body: [
          "Zoom into a photo far enough and you see squares — **pixels**. Zoom into a logo far enough and the edges stay razor sharp. That is a **vector**: a shape stored as mathematics (points, curves, fills) rather than dots.",
          "Vectors are the right choice for anything that must scale: logos, icons, illustrations, posters, signage. Adobe Illustrator is the industry tool for them.",
        ],
      },
      {
        type: "compare",
        title: "Raster (Photoshop) vs Vector (Illustrator)",
        columns: [
          {
            title: "Raster — pixels",
            tone: "neutral",
            items: [
              "Photographs, textures, digital painting",
              "Resolution matters: 300 DPI for print",
              "Zooming in reveals squares",
            ],
          },
          {
            title: "Vector — maths",
            tone: "good",
            items: [
              "Logos, icons, type, infographics",
              "Scales to any size, infinitely",
              "Small file size, editable forever",
            ],
          },
        ],
      },
      {
        type: "steps",
        title: "Build it: a geometric logo mark",
        steps: [
          {
            title: "Set up the artboard",
            body: "Create a 1000 × 1000 px artboard (rgb, 72 ppi is fine for screen). A square canvas keeps logo proportions easy to judge.",
          },
          {
            title: "Start with primitives",
            body: "Draw the base shapes with the Rectangle (M), Ellipse (L) and Polygon tools. Geometric logos feel calm because every angle is deliberate.",
            hint: "Hold Shift while drawing to lock perfect squares and circles.",
          },
          {
            title: "Align and cut",
            body: "Select two shapes and use the **Shape Builder** tool (Shift + M): drag across regions to merge them, Alt + click on a region to delete it. This is how most modern marks are made.",
          },
          {
            title: "Draw custom curves with the pen",
            body: "Click to place a corner point, click-and-drag to create a smooth curve. Fewer points always means cleaner curves — 4 points can describe a whole leaf.",
            code: "Pen tool: P\nAdd anchor point: +\nConvert anchor point: Shift + C",
          },
          {
            title: "Balance the shape",
            body: "Optical balance beats mathematical balance. Rotate the mark 180° or look at it in a mirror — obvious unevenness will jump out immediately.",
          },
          {
            title: "Test it small",
            body: "Duplicate the artboard and scale the logo to 24 × 24 px, then copy it into a browser tab's favicon size. If it still reads, your shapes are strong enough.",
          },
          {
            title: "Export the right files",
            body: "**File → Export → Export As**: SVG for the web, PNG at 2× for app assets, and PDF/AI for print. Always keep the .ai master file, too.",
            code: "logo.svg   — web, infinitely scalable\nlogo@2x.png — app icon, raster fallback\nlogo.ai    — editable master",
          },
        ],
      },
      {
        type: "figure",
        title: "Shape Builder in one line",
        caption:
          "Drag across overlapping shapes to unite them, Alt + click to remove a region. Four primitives become one clean mark.",
        visual: "figma",
        items: ["Circle", "Rectangle", "Union", "Subtract", "Final mark"],
      },
      {
        type: "keyTerms",
        terms: [
          { term: "Anchor point", definition: "A point that defines a vector path. Fewer anchors, smoother curves." },
          { term: "Bezier curve", definition: "A smooth curve controlled by anchor points and direction handles." },
          { term: "Pathfinder", definition: "Illustrator's Unite / Minus Front / Intersect operations for combining shapes." },
          { term: "SVG", definition: "Scalable Vector Graphics — a text-based vector format perfect for the web." },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "The three-anchor trap",
        body: "Beginners add dozens of anchors to 'fix' a curve, making it lumpy and hard to edit. If a curve looks wrong, adjust the handles of the two anchors you already have — it almost always works.",
      },
      {
        type: "callout",
        variant: "didYouKnow",
        title: "The most famous logo is a grid",
        body: "The Apple logo, the Google 'G' and most airline marks are built on circles from a geometric grid. Construction lines are not cheating — they are craft.",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "multipleChoice",
        prompt: "Why do logos work better as vectors?",
        options: [
          "They load faster on websites only",
          "They stay sharp at any size because they are mathematical shapes",
          "They can hold more colours",
          "They are easier to photograph",
        ],
        answer: 1,
        explanation:
          "Vectors are defined by points and curves, so they can scale infinitely without pixelation.",
        points: 20,
      },
      {
        id: "q2",
        type: "fillBlank",
        prompt: "The Illustrator tool used to merge and delete regions of overlapping shapes is the _______ tool.",
        answer: ["shape builder", "shapebuilder"],
        explanation: "Shape Builder (Shift + M) drags to unite regions and Alt + clicks to remove them.",
        points: 20,
      },
      {
        id: "q3",
        type: "trueFalse",
        prompt: "A vector file typically has a much smaller file size than a high-resolution raster image.",
        answer: true,
        explanation: "Vectors store equations, not millions of pixels, so SVGs are usually a few kilobytes.",
        points: 20,
      },
      {
        id: "q4",
        type: "multipleChoice",
        prompt: "Which export format should you use for a logo on a website?",
        options: ["PSD", "SVG", "TIFF", "BMP"],
        answer: 1,
        explanation: "SVG is the web standard for vectors — sharp at every zoom level and tiny in size.",
        points: 20,
      },
    ],
    updatedAt: "2026-09-12",
    author: "Mr. Arya Nugroho · Adobe Instructor",
  },

  /* ------------------------- Roadmap (in authoring) ------------------------ */
  {
    id: "figma-prototyping",
    title: "Figma: Prototyping & Interactions",
    subjectId: "design",
    unitId: "figma",
    track: "design",
    summary: "Connect screens with smart animate and present a clickable prototype.",
    difficulty: "Intermediate",
    minutes: 25,
    xp: 175,
    tags: ["Figma", "Prototype", "Motion"],
    objectives: ["Link frames with triggers", "Use smart animate for transitions"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-14",
    author: "Ms. Kirana Dewi · Design Lead",
  },
  {
    id: "photoshop-poster",
    title: "Photoshop: Layers, Masks & Poster Design",
    subjectId: "design",
    unitId: "adobe",
    track: "design",
    summary: "Composite images with layer masks and design an environmental awareness poster.",
    difficulty: "Intermediate",
    minutes: 35,
    xp: 200,
    tags: ["Photoshop", "Poster", "Masks"],
    objectives: ["Use layer masks non-destructively", "Set up print-ready documents"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-15",
    author: "Mr. Arya Nugroho · Adobe Instructor",
  },
  {
    id: "typography-fundamentals",
    title: "Typography Fundamentals",
    subjectId: "design",
    unitId: "design-foundations",
    track: "design",
    summary: "Type scales, pairing fonts and setting text that people actually finish reading.",
    difficulty: "Beginner",
    minutes: 20,
    xp: 140,
    tags: ["Typography", "Type scale"],
    objectives: ["Build a modular type scale", "Pair two fonts confidently"],
    blocks: [],
    quiz: [],
    comingSoon: true,
    updatedAt: "2026-09-15",
    author: "Ms. Kirana Dewi · Design Lead",
  },
];
