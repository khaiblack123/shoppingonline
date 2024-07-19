import axios from "axios";
import React,  {Component} from 'react'
import SlickSlider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class Slider extends Component{
    constructor(props){
        super(props);
        this.state={
            image:[],
        };
    }
    render(){
        const image = this.state.image.map((item) =>{
            return(
                <img key={item._id} src={"data:image/jpg;base64,"+item.image} height="550px"/>
            );
        });
        const setting ={
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow:1,
            slidesToScroll:1,
            autoplay: true,
            autoplaySpeed:2000
        };
        return(
            <SlickSlider{...setting}>{image}</SlickSlider>
        );
    }
    componentDidMount(){
        this.apiGetSliders();
    }
    //apis
    apiGetSliders(){
        axios.get('/api/customer/products/new').then((res)=>{
            const result =res.data;
            this.setState({image:result});
        });
    }
}
export default Slider;