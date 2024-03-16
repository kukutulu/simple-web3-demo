import Head from "next/head";

interface MetaProps {
  title: string;
  description?: string;
  url?: string;
  imageUrl?: string;
}

export function Meta({ title, description, url, imageUrl }: MetaProps) {
  return (
    <Head>
      <title>{title}</title>

      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {description && (
        <meta name="description" content={description} key="description" />
      )}
      <meta property="og:title" content={title} key="title" />
      {description && (
        <meta
          property="og:description"
          content={description}
          key="ogdescription"
        />
      )}
      <meta property="og:site_name" content="centic.io" />
      {imageUrl && (
        <meta property="og:image" content={imageUrl} key="ogimage" />
      )}
    </Head>
  );
}
