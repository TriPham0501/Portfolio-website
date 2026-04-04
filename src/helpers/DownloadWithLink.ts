const DownloadWithLink = (link, isNewTab) => {
  const aElement = document.createElement("a");
  aElement.href = link;
  if (isNewTab) aElement.target = "_blank";
  aElement.click();
};
export default DownloadWithLink;
