import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import Slider from '@react-native-community/slider';

const top = '<script src="http://moinejf.free.fr/js/abcweb2-1.js"></script><script src="http://moinejf.free.fr/js/snd-1.js"></script><body style="background-color: rgb(250, 248, 234);"><div class="abc">\nX:1'
const bottom = '\n</div></body></html>'
export default class Partituras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compas: '1/4',
      tempo: 126,
      title: 'An Chloe (Page 1)',
      composer: 'Wolfgang Amadeus Mozart',
      scale: 1.25,
      contenido: '\n%%pagewidth 25cm\n%%leftmargin 1.27cm\n%%rightmargin 1.27cm\n%%score 1 { 2 | 3 }\nL:1/8\nM:2/2\nI:linebreak $\nK:Eb\nV:1 treble nm="Voice"\n%%MIDI program 52\n%%MIDI control 7 101.6\n%%MIDI control 10 63.5\nL:1/4\nV:2 treble nm="Piano"\n%%MIDI program 0\n%%MIDI control 7 101.6\n%%MIDI control 10 63.5\nV:3 bass \n%%MIDI channel 2\n%%MIDI program 0\n%%MIDI control 7 101.6\n%%MIDI control 10 63.5\nV:1\n    z | z4 | z4 | z4 | z4 | z4 | z2 z G/A/ | B B B B | (B3/2 e/) e z | (G3/2 B/) B z | E2- E/F/G/A/ | %11\nw: ||||||Wenn die|Lieb’ aus dei- nen|blau- * en,|hel- * len,|off- * nen Au- gen|\n    (G F) z G/A/ | B B B B | (B3/2 e/) e z | G2- (G/A/)(=A/B/) | E E (G/>_A/)(F/>G/) | E z z G/=A/ | %17\nw: sieht, _ und vor|Lust hin- ein zu|schau- * en|mir’s _ _ im _|Her- zen klopft _ und _|glüht; und ich|\n    B F c F |]\nw: hal- te dich und|\nV:2\n"^Allegretto"!p! (GA) | B2 B2 B2 B2 | (!turn!B2 e2) z4 | (!turn!G2 B2) z4 | %4\n!f! E3 F/G/ A/B/c/d/ e/f/g/a/ | (3(bge) (3(BGE) G z!p! [A,B,DF] z | ([A,B,-DF]4 [G,B,E]2) z2 | %7\n    (G,B,EB, A,B,FB,) | (G,B,EB, G,B,EB,) | (G,B,EB, G,B,EB,) | (EB,G,B, E[DF][EG][FA]) | %11\n    ([EG]2 [DF]2) z4 | (G,B,EB, A,B,FB,) | (G,B,EB, G,B,EB,) | (G,B,EB, G,B,EB,) | %15\n    (G,B,EB,) [B,E] z [A,D] z | [G,E]2 z2 z4 | (B,DFD) (CEFE) |]\nV:3\n    z2 |!p! (E,B,G,B, D,A,F,A,) | (E,B,G,B, E,B,G,B,) | (E,B,G,B, E,B,G,B,) | (B,,G,E,G, B,,G,E,G,) | %5\n    B,,2 z2 z2 B,, z | [E,,E,]4- [E,,E,]2 z2 | [E,,E,]4 [D,,D,]4 | [E,,E,]2 z2 z4 | [E,,E,]2 z2 z4 | %10\n    (G,,4 E,,4) | B,,2 B,2 B,,2 z2 | [E,,E,]4 [D,,D,]4 | [E,,E,]2 z2 z4 | [E,,E,]2 z2 z4 | %15\n    [B,,,B,,]4 z2 B,, z | E,2 B,,2 E,,2 z2 | [D,,D,]4 [=A,,,=A,,]4 |]'
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.slcontainer}>
          <Text>Tempo</Text>
          <Slider
            style={styles.sliders}
            minimumValue={40}
            value={this.state.tempo}
            maximumValue={200}
            step={1}
            onValueChange={(tempo) => this.setState({ tempo })}
          />
          <Text style={{ textAlign: "center" }}>{this.state.tempo}</Text>
        </View>
        <View style={styles.slcontainer}>
          <Text>Zoom</Text>
          <Slider
            style={styles.sliders}
            minimumValue={0.5}
            value={this.state.scale}
            maximumValue={2.5}
            step={0.25}
            onValueChange={(scale) => this.setState({ scale })}
          />
          <Text style={{ textAlign: "center" }}>{this.state.scale}</Text>
        </View>
        <WebView source={{ html: top + '\nQ:' + this.state.compas + '=' + this.state.tempo + '\nT:' + this.state.title + '\nC:' + this.state.composer + '\n%%scale ' + this.state.scale + this.state.contenido + bottom }} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingBottom: 70,
    overflow: 'hidden',
    backgroundColor: '#FAF8EA'
  },
  slcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  sliders: {
    width: 200,
    height: 40
  }
});