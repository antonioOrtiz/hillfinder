
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { logOutUser } from '../store'
import { withRouter } from "react-router-dom";

let Dashboard;

Dashboard = ({ isLoggedIn, logOutUser }) => (
 <>
 <h1>Dashboard</h1>
 </>
);



function mapStateToProps(state) {
 const { isLoggedIn, logOutUser } = state
 return { isLoggedIn, logOutUser }
}
const mapDispatchToProps = dispatch =>
 bindActionCreators({ logOutUser }, dispatch)

export default compose(
 withRouter,
 connect(mapStateToProps, mapDispatchToProps)
)(withRouter(Dashboard));
