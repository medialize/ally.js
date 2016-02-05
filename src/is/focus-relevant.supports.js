
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
import canFocusRedirectImgUsemap from '../supports/focus-redirect-img-usemap';
import canFocusRedirectLegend from '../supports/focus-redirect-legend';
import canFocusScrollBody from '../supports/focus-scroll-body';
import canFocusScrollContainer from '../supports/focus-scroll-container';
import canFocusScrollContainerWithoutOverflow from '../supports/focus-scroll-container-without-overflow';
import canFocusSummary from '../supports/focus-summary';
import canFocusSvg from '../supports/focus-svg';
import canFocusSvgFocusableAttribute from '../supports/focus-svg-focusable-attribute';
import canFocusTable from '../supports/focus-table';
import canFocusVideoWithoutControls from '../supports/focus-video-without-controls';
import svgFocusMethod from '../supports/svg-focus-method';

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
    canFocusRedirectImgUsemap: canFocusRedirectImgUsemap(),
    canFocusRedirectLegend: canFocusRedirectLegend(),
    canFocusScrollBody: canFocusScrollBody(),
    canFocusScrollContainer: canFocusScrollContainer(),
    canFocusScrollContainerWithoutOverflow: canFocusScrollContainerWithoutOverflow(),
    canFocusSummary: canFocusSummary(),
    canFocusSvg: canFocusSvg(),
    canFocusSvgFocusableAttribute: canFocusSvgFocusableAttribute(),
    canFocusTable: canFocusTable(),
    canFocusVideoWithoutControls: canFocusVideoWithoutControls(),
    svgFocusMethod: svgFocusMethod(),
  };
});
