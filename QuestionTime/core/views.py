from django.conf import settings
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.base import TemplateView

class IndexTemplateView(LoginRequiredMixin, TemplateView):

    def get_template_names(self):
        # można w łatwiejszy sposób przekazać wybrany szablon pliku, ale ten sposób pozwala na łatwe rozszerzenia
        if not settings.DEBUG: #add not for test, before you have nginx
            template_name = "index-dev.html"
        else:
            template_name = "index.html"
        return template_name
