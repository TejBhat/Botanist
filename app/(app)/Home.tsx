import { View,Text,StyleSheet } from "react-native";
import {Button} from "react-native-paper";

export default function HomeScreen(){
    return(
        
            <View style={style.wholescreen}>
                <Text style={style.title}>Botanist</Text>
                <Button mode="contained" style={style.button} 
                contentStyle={style.buttontext} 
                labelStyle={style.buttonLabel}>Take a photo</Button> {/*click the button, it goes to camera to take the photo*/}
           </View>
    );
}

const style=StyleSheet.create({
    title:{
        position:"absolute",
        top:65,
        fontWeight:"bold",
        fontSize:40,
        color:"#ffff00",
    },
wholescreen:{
    flex:1,
    backgroundColor:"#006400",
    justifyContent:"center",
    alignItems:'center',

},
button:{
  borderRadius:30,
  width:250,  
  backgroundColor:"#ffff00",
},
buttontext:{
    height:60,
    justifyContent:"center",
},
buttonLabel:{
      fontWeight:"bold",
      fontSize:20,
      color:"#006400",
},


});