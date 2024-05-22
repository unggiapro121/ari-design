// === Contentstack data model base types ===
export type ContentstackLink = {
  title: string;
  href: string;
};

export type ContentstackReference = {
  uid: string;
  _content_type_uid: string;
};

export type ContentstackReferenceWrapper = {
  reference: ContentstackReference[];
  _metadata: {
    uid: string;
  };
}

export type ContentstackJsonRichtext = {
  type: string;
  attrs: unknown;
  uid: string;
  children: unknown[];
  _version: number;
};

export type ContentstackSelect = string | null;

export interface ContentstackBaseData {
  _version: number;
  locale: string;
  uid: string;
  ACL: unknown;
  created_at: string;
  created_by: string;
  tags: string[];
  title: string;
  updated_at: string;
  updated_by: string;
  publish_details: {
    environment: string;
    locale: string;
    time: string;
    user: string;
  };
}

export interface ContentstackBaseContent extends ContentstackBaseData {
  _in_progress: boolean;
}

export interface ContentstackAsset extends ContentstackBaseData {
  is_dir: boolean;
  content_type: string;
  description?: string;
  file_size: string;
  filename: string;
  parent_uid: string;
  url: string;
}

export type ContentstackFile = ContentstackAsset | null;
export type ContentstackImage = ContentstackAsset | null;

// === custom helper types ===
/**
 * Minimum image data for use in component props that is also compatible with image assets from Contentstack
 */
export type ImgData = {
  url: string;
  description?: string;
} | null;
