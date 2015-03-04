var colCount = 0;
var minColWidth = 145;
var maxColWidth = 300;
var margin = 10;
var lftMgn = 10;
var tpMgn = 10;
var spaceLeft = 0;
var windowWidth = 0;
var prevElm;
var adjustBodyWd = 0;
var setBodyWd = true;

$(function(){
	$(window).resize(setupBlocks);
});

function setupBlocks() {
	contBlocks = [];
	lftMgn = tpMgn = margin;
	setBodyWd = true;
	$('body').removeAttr('style');
	$('.block').removeAttr('indexed');
	$('.block').each(function(i){
		contBlocks.push($(this));
	});	
	positionIt(contBlocks);
	
}

function positionIt(contBlocks) {
	windowWidth = $('body').width();
	tpMgn = margin;
	$.each(contBlocks, function( index, value ) {
		var attr = $(this).attr('indexed');
		if (typeof attr == typeof undefined) {
			if($(this).prev().outerWidth() != undefined){
				prvElmWdt = $(prevElm).outerWidth()+margin;
			}else{
				prvElmWdt = 0;
			}
			
			lftMgn = lftMgn + prvElmWdt;
			adjustBodyWd = lftMgn;
			fitBlockPst = lftMgn + ($(this).outerWidth()+margin);
			if(fitBlockPst > windowWidth){
				rearrangeOrder(contBlocks, contBlocks[index]);
				tpMgn = tpMgn + ($(this).outerHeight()+margin);
				lftMgn = margin;
				
				if(setBodyWd){
					$('body').css('width',adjustBodyWd+'px');
					setBodyWd = false;
				}
			}			
			
			$(this).css({
				'left':lftMgn+'px',
				'top':tpMgn+'px'
			}).attr('indexed','true');
			
			prevElm = $(this);
		}
	});
}

function rearrangeOrder(contBlocks, currElem) {
	if($(currElem).hasClass('lgBlk')){
		smallElm = $(currElem).nextAll('.smBlk');
		for(i=0; i < smallElm.length; i++){
			elem = smallElm[i];
			var tstAttr = $(elem).attr('indexed');
			if (typeof tstAttr == typeof undefined){
				nextSmallElm = $(elem);
				break;
			}
			
		}
		
		fitBlockPst = lftMgn + ($(nextSmallElm).outerWidth()+margin);
		if(fitBlockPst < windowWidth){
			$(nextSmallElm).css({
				'left':lftMgn+'px',
				'top':tpMgn+'px'
			}).attr('indexed','true');
			adjustBodyWd = fitBlockPst; 
		}	
	}
}
	
