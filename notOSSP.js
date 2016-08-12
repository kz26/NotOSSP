var MutationObserver = window.MutationObserver;
var nlp = window.nlp_compromise;

function processNodes(nodes) {
	if (window.location.toString().indexOf("facebook.com/groups/1500321840185061") != -1) {
		$(nodes).find('.userContent').each(function(i, e) {
			e = $(e);
			if (!e.data('processed')) {
				var sentenceCount = nlp.text(e.text()).sentences.length;
				if (sentenceCount > 1) {
					e.prepend("<p class='not-ossp-warning'>WARNING: Not a one-sentence startup pitch. "
						+ "Sentences: " + sentenceCount.toString() + "</p>");
					e.find('p').slice(1).addClass('not-ossp-text');
				}
				e.data('processed', true);
			}
		});
	}
}

var observer = new MutationObserver(function(mutationRecords) {
	mutationRecords.forEach(function(mutation) {
		if (mutation.type == 'childList') {
			processNodes($(mutation.addedNodes));
		}
	});
});
observer.observe(document.body, {childList: true, subtree: true});
processNodes(document.body);