
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOutUser } from '../store'
import { withRouter } from "react-router-dom";

let Dashboard;

Dashboard = ({ isLoggedIn, logOutUser }) => (
 <>
 <h1>Dashboard</h1>
 </>
);



function mapStateToProps(state) {
 const { isLoggedIn } = state
 return { isLoggedIn }
}
const mapDispatchToProps = dispatch =>
 bindActionCreators({ logOutUser }, dispatch)

export default withRouter(
 connect(mapStateToProps, mapDispatchToProps)(Dashboard)
)
