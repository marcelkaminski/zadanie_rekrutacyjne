from django.shortcuts import render
import json
from django.contrib.staticfiles import finders
from django.http import JsonResponse
from django.core.paginator import Paginator, EmptyPage

def index(request):
    url = finders.find('my_app/data.json')
    data = open(url).read()
    jsonData = json.loads(data)
    return render(request, "my_app/index.html", {'jsonData': jsonData})



def pagination(request):
    url = finders.find('my_app/data.json')
    data = open(url).read()
    jsonData = json.loads(data)
    
    items_per_page = request.GET.get('items_per_page', 10)
    p = Paginator(jsonData, items_per_page)

    page_num = request.GET.get('page', 1)

    try:
        page = p.page(page_num)
    except EmptyPage:
        page = p.page(1)
    

    context = {'items': page,
                'per_page':items_per_page}

    return render(request, 'my_app/pagination.html', context)


def search(request):
    return render(request, "my_app/search.html")


def get_search_result(request):
    sku = request.GET.get('sku', None)
    name = request.GET.get('name', None)
    description = request.GET.get('description', None)

    url = finders.find('my_app/data.json')
    data = open(url).read()
    jsonData = json.loads(data)
    result = []
    for s in jsonData:
        if sku in s['SKU'].lower() and name in s['name'].lower() and description in s['description'].lower() :
            result.append(s)
    if result:
        return JsonResponse(result, safe=False)
    else:
        return JsonResponse([{"message":"No results"}], safe=False)


def get_product_page(request):
    name = request.GET.get('name', None)

    url = finders.find('my_app/data.json')
    data = open(url).read()
    jsonData = json.loads(data)
    result = None
    
    try:
        for s in jsonData:
            if name == s['name']:
                result = s
                break
    except:
        result = {"message":"No results"}

    return render(request, "my_app/product.html", {'item': result})