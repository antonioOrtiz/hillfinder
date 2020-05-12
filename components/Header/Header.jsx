import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

const MyHeader = ({ mobile, margin, content, textAlign, color }) => (
  <Header
    as="h1"
    content={content}
    textAlign={textAlign}
    inverted
    style={{
      fontSize: mobile ? '.5em' : '2.5em',
      fontWeight: 'normal',
      padding: mobile ? '0' : '0',
      margin: margin ? '1em 0 0 0' : '0',
      color: color ? ' #ffffff' : '#000000'
    }}
  />
);

MyHeader.propTypes = {
  mobile: PropTypes.bool,
  H1Header: PropTypes.string,
  H2Header: PropTypes.string
};

export default MyHeader;
