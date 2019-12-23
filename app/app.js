import { connect } from 'react-redux';
import {navigator} from './redux/store';
console.disableYellowBox = true;
const App = navigator;

function mapStateToProps(state) {
  return {state: state.navigationState};
}

export default connect(mapStateToProps)(App);





