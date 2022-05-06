const MarkdownLoadingSkeleton = () => {
  return (
    <div className='flex bg-gray-800'>
      <aside className='h-screen bg-gray-900 animate-pulse w-80'></aside>
      <main className='h-[calc(100vh-6rem)] bg-gray-800 w-[calc(100vw-20rem)] animate-pulse'></main>
    </div>
  );
};

export default MarkdownLoadingSkeleton;
