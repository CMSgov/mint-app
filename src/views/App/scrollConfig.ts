const scrollBlackList: string[] = [
  'read-only',
  'sample-model-plan',
  '/help-and-knowledge/operational-solutions',
  '?solution=',
  '&solution='
];

const shouldScroll = (path: string, prevPath: string | undefined) => {
  return (
    !scrollBlackList.some(r => path.includes(r)) &&
    !scrollBlackList.some(r => prevPath?.includes(r))
  );
};

export default shouldScroll;
