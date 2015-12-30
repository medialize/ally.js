
import memorizeResult from '../supports/memorize-result';
import canFocusAudioWithoutControls from '../supports/focus-audio-without-controls';
import canFocusChildrenOfFocusableFlexbox from '../supports/focus-children-of-focusable-flexbox';
import canFocusFieldset from '../supports/focus-fieldset';
import canFocusFlexboxContainer from '../supports/focus-flexbox-container';
import canFocusImgIsmap from '../supports/focus-img-ismap';
import canFocusImgUsemapTabindex from '../supports/focus-img-usemap-tabindex';
import canFocusLabelTabindex from '../supports/focus-label-tabindex';
import canFocusObjectSvg from '../supports/focus-object-svg';
import canFocusObjectSwf from '../supports/focus-object-swf';
import canFocusScrollBody from '../supports/focus-scroll-body';
import canFocusScrollContainer from '../supports/focus-scroll-container';
import canFocusScrollContainerWithoutOverflow from '../supports/focus-scroll-container-without-overflow';
import canFocusSummary from '../supports/focus-summary';
import canFocusSvgMethod from '../supports/svg-focus-method';
import canFocusTable from '../supports/focus-table';
import canFocusVideoWithoutControls from '../supports/focus-video-without-controls';

export default memorizeResult(function() {
  return {
    canFocusAudioWithoutControls: canFocusAudioWithoutControls(),
    canFocusChildrenOfFocusableFlexbox: canFocusChildrenOfFocusableFlexbox(),
    canFocusFieldset: canFocusFieldset(),
    canFocusFlexboxContainer: canFocusFlexboxContainer(),
    canFocusImgIsmap: canFocusImgIsmap(),
    canFocusImgUsemapTabindex: canFocusImgUsemapTabindex(),
    canFocusLabelTabindex: canFocusLabelTabindex(),
    canFocusObjectSvg: canFocusObjectSvg(),
    canFocusObjectSwf: canFocusObjectSwf(),
    canFocusScrollBody: canFocusScrollBody(),
    canFocusScrollContainer: canFocusScrollContainer(),
    canFocusScrollContainerWithoutOverflow: canFocusScrollContainerWithoutOverflow(),
    canFocusSummary: canFocusSummary(),
    canFocusSvgMethod: canFocusSvgMethod(),
    canFocusTable: canFocusTable(),
    canFocusVideoWithoutControls: canFocusVideoWithoutControls(),
  };
});
