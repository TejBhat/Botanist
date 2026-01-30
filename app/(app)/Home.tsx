import { View,Text,StyleSheet } from "react-native";
import {Card} from "react-native-paper";

export default function HomeScreen(){
    return(
        
             <View style={style.container}>
            
            <View>
                <Card style={style.button}>
                <Text>Scan Image</Text>
                </Card>
           
       </View>
       </View>
        
       
       

    );
}

const style=StyleSheet.create({
container:{
    flex:1,
    backgroundColor:"green",
},
button:{

},


});