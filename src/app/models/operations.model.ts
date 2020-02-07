export interface SearchStatus {
  id: number;
  status: string;
}

export interface SearchManager {
  id: number;
  manager: string;
}

export interface TableData {
  id: number;
  document: string;
  name: string;
  agent: string;
  state_id: number;
  cups: string;
  marketer: string;
  rate_id: number;
  consumption: number;
  prlevel_id: number;
  eocups: number;
  permanence: any;
  modified: string;
  order_modified: string;
  scoring: string;
  scoring_auth: string;
}
