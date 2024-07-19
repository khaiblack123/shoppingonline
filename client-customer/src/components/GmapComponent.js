import React, {Component} from 'react';
class Gmap extends Component{
    render(){
        return(
            <div className='align-center'>
                <h2 className='text-center'>MY LOCATION</h2>
                <iframe title='gmap' src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4540.675576166644!2d106.6978286871157!3d10.827623450575738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f4a62fce9b%3A0xc99902aa1e26ef02!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBWxINuIExhbmcgLSBDxqEgc-G7nyBjaMOtbmg!5e0!3m2!1svi!2s!4v1721210905589!5m2!1svi!2s' width="800" height="600" style={{border:0}} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                
            </div>
        );
    }
}
export default Gmap;