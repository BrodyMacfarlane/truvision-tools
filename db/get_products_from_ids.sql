select a.itemid, a.sku, a.productname, a.image
from products a
group by a.itemid, a.sku, a.productname, a.image