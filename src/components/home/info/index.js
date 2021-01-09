import './index.css'
import {connect} from 'react-redux';
import {OPEN_SIGNIN_MODAL, CLOSE_SIGNIN_MODAL} from '../../../redux_helper/constants/action-types';

const Info = (props) => {
  
  const onOpenSignModal = () => {
    props.dispatch({type : OPEN_SIGNIN_MODAL, payload : {}})
  }

  return (
<section className="py-0 border-bottom-xs">
<h2 className='font_36_txt  font-weight-bold text-center' style={{marginTop : 16}}>How it works?</h2>
    <div className="container py-3">
        <div className="row">
        <p className = "font_22_txt fw_400">
            “We will show your favorite apparels based on your selection criteria. You can try “Show Me” section below to get an idea about the application. 
            If you like it, please <a style={{textDecorationLine : 'underline', color : '#00f'}} onClick={()=>onOpenSignModal()}>open an account.</a>
        </p>
        </div>
    </div>
</section>
  );
}


export default connect(null)(Info);

