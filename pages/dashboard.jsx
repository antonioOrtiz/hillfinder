import Router from 'next/router'
// import withAuth from 'next-authentication'

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



// const authOptions = {
//  // client callback for invalid sessions
//  callback: () => Router.push('/'),
//  // the server takes care of the redirect, only pass a string
//  // with the route
//  serverRedirect: '/'
// }


function mapStateToProps(state) {
 const { isLoggedIn, logOutUser } = state
 return { isLoggedIn, logOutUser }
}
const mapDispatchToProps = dispatch =>
 bindActionCreators({ logOutUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));

