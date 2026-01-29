import { View,Text,StyleSheet } from "react-native";

export default function HomeScreen(){
    return(
        <View style={style.container}>
             <View>
            <Text>Homescreen</Text>
        </View>
        </View>
       

    );
}

const style=StyleSheet.create({
container:{
    flex:1,
    backgroundColor:"green",
}

});