from django import template

register = template.Library()

@register.filter(name='discount')
def discount(value, arg):
    return round(value * (1-(arg/100)),2)