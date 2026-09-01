const ShortenUrlList = ({ data }) => (
  <div className="space-y-4">
    {data.map((url) => {
      const shortLink = `${import.meta.env.VITE_BACKEND_URL}/${url.shortUrl}`;

      return (
        <article key={url.id} className="rounded-lg border border-slate-200 p-4">
          <p className="truncate font-medium text-slate-800" title={url.originalUrl}>{url.originalUrl}</p>
          <a className="mt-1 block break-all text-sm text-blue-600 hover:underline" href={shortLink} target="_blank" rel="noreferrer">
            {shortLink}
          </a>
          <div className="mt-3 flex justify-between text-sm text-slate-600">
            <span>{url.clickCount ?? 0} clicks</span>
            <span>{new Date(url.createdDate).toLocaleDateString()}</span>
          </div>
        </article>
      );
    })}
  </div>
);

export default ShortenUrlList;
