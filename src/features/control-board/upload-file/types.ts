export type HttpResponse<T = any> = {
  status: number;
  data?: T;
};
export type ItemsKey = number | string;
export type ItemsEntry = Record<ItemsKey, string>;
export type ItemsGroup = Record<ItemsKey, ItemsEntry>;

export type FileType = { target: { files: any } };

export type UploadFileProps = {
  items: any;
  setItems: Function;
  format: string;
  defaultData: any[];
  setDefaultData: Function;
  fileName: string;
  setFileName: Function;
  delimiter: string;
  setDelimiter: Function;
  exportDelimiter: string;
  setExportDelimiter: Function;
  setUtfError: Function;
  uploadDateFormat: string;
  setUploadDateFormat: Function;
  formats: string;
  setFormats: Function;
};
