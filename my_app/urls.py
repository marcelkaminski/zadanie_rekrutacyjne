from django.urls import path

from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.pagination, name="pagination"),
    path("search", views.search, name="search"),
    path("get_search_result/", views.get_search_result, name="get_search_result"),
    path("product/", views.get_product_page, name="product")
    ] 