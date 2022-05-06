import '../interfaces/types';

const worker: Worker = self as unknown as Worker;

const parseMarkdown = async (markdown: string) => {
  const { parse_markdown } = await import('../wasm/pkg');

  worker.postMessage({
    type: 'markdownHtmlData',
    data: parse_markdown(markdown),
  });
};

worker.onmessage = (e) => {
  switch (e.data.type) {
    case 'parse':
      parseMarkdown(e.data.data);
      break;
  }
};
