const DEFAULT_DATA_ROOT: string =
  'https://raw.githubusercontent.com/ginkgo-project/ginkgo-data/master/';

export const DEFAULT_BENCHMARK_RESULT_URL: string = DEFAULT_DATA_ROOT + 'data';

export const DEFAULT_TRANSFORM_SCRIPT_URL: string =
  DEFAULT_DATA_ROOT + 'plots';

export const DEFAULT_TRANSFORM_EXPRESSION: string = `{
  "type": "line",
  "data": {
    "labels": \`Step number\`,
    "datasets": [
      {
        "label": "Plotting complexity",
        "data": Involvement,
        "backgroundColor": "hsl(38,93%,54%)",
        "borderColor": "hsl(38,93%,54%)",
        "fill": false
      }
    ]
  },
  "options": {
    "title": {
      "display": true,
      "text": "Involvement plot"
    },
    "tooltips": {
      "mode": "index",
      "intersect": false
    },
    "scales": {
      "xAxes": [
        {
          "scaleLabel": {
            "display": true,
            "labelString": "Step"
          }
        }
      ],
      "yAxes": [
        {
          "scaleLabel": {
            "display": true,
            "labelString": "Involvement"
          },
          "ticks": {
            "min": 0
          }
        }
      ]
    }
  }
}`;

export const DEFAULT_RAW_DATA: any[] = [
  {
    "Step number": 1,
    "Description": "Read some data to get started.",
    "Involvement": 2
  },
  {
    "Step number": 2.1,
    "Description": "Load an example transformation script.",
    "Involvement": 1
  },
  {
    "Step number": 2.2,
    "Description": "Modify the script to extract the data you want.",
    "Involvement": 5
  },
  {
    "Step number": 3,
    "Description": "View you processed JSON or a Chart.js plot.",
    "Involvement": 2
  }
];
