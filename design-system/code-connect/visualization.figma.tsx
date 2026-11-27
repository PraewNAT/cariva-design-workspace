import figma from "@figma/code-connect";
import { VisualizationChart } from "../src/lib/app/components/app/visualization-chart";

// Generated from the Figma component sets listed in docs/components/FIGMA-NAMING.md
// Figma file: Cariva Core Design System (XgxprkSY5mGbzIIwlmscCt)

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64900",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="basic-bar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64946",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="multi-series-bar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-65461",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="striped-bar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-68406",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="dotted-bar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-68921",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="striped-solid-bar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-68979",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="gradient-3d-bar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-69019",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="gradient-bar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-69071",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="isometric-bar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72022",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="dotted-solid-bar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72068",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="duotone-bar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72108",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="monochrome-bar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72148",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="horizontal-bar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72264",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="striped-gradient-area"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72301",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="stacked-dashed-area"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72828",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="dotted-step-area"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72878",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="area-markers"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72994",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="forecast-line"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73184",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="crosshatch-stacked-area"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73227",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="donut-total"
        title={title}
        data={[
                { label: "A", value: 60 },
                { label: "B", value: 40 },
              ]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73280",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="donut-stats"
        title={title}
        data={[
                { label: "A", value: 60 },
                { label: "B", value: 40 },
              ]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73409",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="pattern-pie"
        title={title}
        data={[
                { label: "A", value: 60 },
                { label: "B", value: 40 },
              ]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73462",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="active-donut"
        title={title}
        data={[
                { label: "A", value: 60 },
                { label: "B", value: 40 },
              ]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73520",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="gradient-radar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73563",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="filled-radar"
        title={title}
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73602",
  {
    props: {
      title: figma.string("title"),
    },
    example: ({ title }) => (
      <VisualizationChart
        variant="score-radial"
        title={title}
        data={[
                { label: "A", value: 60 },
                { label: "B", value: 40 },
              ]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64888",
  {
    example: () => (
      <VisualizationChart
        variant="basic-bar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64928",
  {
    example: () => (
      <VisualizationChart
        variant="multi-series-bar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-64980",
  {
    example: () => (
      <VisualizationChart
        variant="striped-bar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-65489",
  {
    example: () => (
      <VisualizationChart
        variant="dotted-bar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-68434",
  {
    example: () => (
      <VisualizationChart
        variant="striped-solid-bar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-68955",
  {
    example: () => (
      <VisualizationChart
        variant="gradient-3d-bar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-69007",
  {
    example: () => (
      <VisualizationChart
        variant="gradient-bar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-69047",
  {
    example: () => (
      <VisualizationChart
        variant="isometric-bar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-69099",
  {
    example: () => (
      <VisualizationChart
        variant="dotted-solid-bar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72056",
  {
    example: () => (
      <VisualizationChart
        variant="duotone-bar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72096",
  {
    example: () => (
      <VisualizationChart
        variant="monochrome-bar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72136",
  {
    example: () => (
      <VisualizationChart
        variant="horizontal-bar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72177",
  {
    example: () => (
      <VisualizationChart
        variant="striped-gradient-area"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72292",
  {
    example: () => (
      <VisualizationChart
        variant="stacked-dashed-area"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72335",
  {
    example: () => (
      <VisualizationChart
        variant="dotted-step-area"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72856",
  {
    example: () => (
      <VisualizationChart
        variant="area-markers"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-72906",
  {
    example: () => (
      <VisualizationChart
        variant="forecast-line"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73022",
  {
    example: () => (
      <VisualizationChart
        variant="crosshatch-stacked-area"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73219",
  {
    example: () => (
      <VisualizationChart
        variant="donut-total"
        title="Chart title"
        data={[
                { label: "A", value: 60 },
                { label: "B", value: 40 },
              ]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73272",
  {
    example: () => (
      <VisualizationChart
        variant="donut-stats"
        title="Chart title"
        data={[
                { label: "A", value: 60 },
                { label: "B", value: 40 },
              ]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73325",
  {
    example: () => (
      <VisualizationChart
        variant="pattern-pie"
        title="Chart title"
        data={[
                { label: "A", value: 60 },
                { label: "B", value: 40 },
              ]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73454",
  {
    example: () => (
      <VisualizationChart
        variant="active-donut"
        title="Chart title"
        data={[
                { label: "A", value: 60 },
                { label: "B", value: 40 },
              ]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73508",
  {
    example: () => (
      <VisualizationChart
        variant="gradient-radar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73551",
  {
    example: () => (
      <VisualizationChart
        variant="filled-radar"
        title="Chart title"
        data={[
                { label: "Jan", a: 85, b: 55 },
                { label: "Feb", a: 130, b: 100 },
              ]}
        series={[{ key: "a", label: "Series A" }, { key: "b", label: "Series B" }]}
      />
    ),
  },
);

figma.connect(
  VisualizationChart,
  "https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=7204-73595",
  {
    example: () => (
      <VisualizationChart
        variant="score-radial"
        title="Chart title"
        data={[
                { label: "A", value: 60 },
                { label: "B", value: 40 },
              ]}
      />
    ),
  },
);
