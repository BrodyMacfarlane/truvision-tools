select a.itemid, a.sku, a.productname, a.categoryid, a.image, ARRAY_AGG(a.storeid) stores, b.sortorder
from products a
join sortorder b on a.itemid = b.itemid
where a.regionid = $1 and a.associatetypeid = $2 and (lower(a.productname) like lower($3) or a.sku like $3)
group by a.itemid, a.sku, a.productname, a.categoryid, a.image, b.sortorder
order by b.sortorder asc