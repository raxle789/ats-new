import parse from 'html-react-parser';

const EmailPreview = ({ emailHtml }) => {
  return <>{parse(emailHtml)}</>;
};

export default EmailPreview;
