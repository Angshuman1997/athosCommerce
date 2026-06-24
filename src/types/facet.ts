export interface FacetValue {
  value?: string;
  label: string;
  count: number;
  active: boolean;
  low?: string;
  high?: string;
  type: string;
}

export interface Facet {
  field: string;
  label: string;
  type: string;
  multiple: string;
  values: FacetValue[];
}