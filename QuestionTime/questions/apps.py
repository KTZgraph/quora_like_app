from django.apps import AppConfig


class QuestionsConfig(AppConfig):
    name = 'questions'

    # signals
    def ready(self):
        import questions.signals # after this change __init__.py