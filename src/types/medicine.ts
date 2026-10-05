export interface OpenFDA {
  application_number?: string[];
  brand_name?: string[];
  generic_name?: string[];
  manufacturer_name?: string[];
  product_ndc?: string[];
  product_type?: string[];
  route?: string[];
  substance_name?: string[];
  rxcui?: string[];
  spl_id?: string[];
  spl_set_id?: string[];
  package_ndc?: string[];
  pharm_class_moa?: string[];
  pharm_class_cs?: string[];
  pharm_class_epc?: string[];
  unii?: string[];
}

export interface Medicine {
  id: string;
  effective_time?: string;
  version?: string;
  openfda?: OpenFDA;

  purpose?: string[];
  indications_and_usage?: string[];
  warnings?: string[];
  dosage_and_administration?: string[];
  inactive_ingredient?: string[];
  active_ingredient?: string[];
  stop_use?: string[];
  ask_doctor?: string[];
}