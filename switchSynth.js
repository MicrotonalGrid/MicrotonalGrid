export default class SwitchSynth
{
    rootNote;
    subdivisions;
    offsets;
    octave;

    AudioContext;
    audioCtx;
    oscArray;
    oscillatorState;     

    constructor(rootNote,subdivisions,offsets,octave)
    {
        this.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
        this.oscArray = new Array;
        this.oscillatorState = new Array;     
    
        this.rootNote = 220;
        this.subdivisions = 12;
        this.offsets = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        this.octave = 2;
    }

    createOscillators()
    {
        for(var i = 0; i<16 ; i++)
        {
          let currentOsc = this.audioCtx.createOscillator();
          currentOsc.frequency.setValueAtTime (Math.pow(this.octave, (this.offsets[i]) / this.subdivisions) * this.rootNote ,this.audioCtx.currentTime);
          currentOsc.startedAlready = false;
          this.oscArray.push(currentOsc);
          this.oscillatorState.push(false);     
        }
    }

    startOscillators()
    {
        this.oscArray.forEach(osc => 
            {
              osc.start();
            }
        );
    }

    connectSpecificOscillator(indexOfOscillator)
    {
        this.oscArray[indexOfOscillator].connect(this.audioCtx.destination);
        this.oscillatorState[indexOfOscillator] = true;
    }

    disconnectSpecificOscillator(indexOfOscillator)
    {
        this.oscArray[indexOfOscillator].disconnect(this.audioCtx.destination);
        this.oscillatorState[indexOfOscillator] = false;
    }
}