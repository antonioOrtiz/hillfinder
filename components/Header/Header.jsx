import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'

const MyHeader = ({ mobile, content, textAlign}) => (
  <Header
   content={content}
   textAlign={textAlign}
   style={{
    fontSize: mobile ? '.5em' : '1.7em',
    fontWeight: 'normal',
    padding: mobile ? '0' : '0',
    margin: mobile ? '1em 0 0 0' : '1em 0 0 0'
   }}
  />
)

MyHeader.propTypes = {
 mobile: PropTypes.bool,
 H1Header: PropTypes.string,
 H2Header: PropTypes.string,
}


export default MyHeader
