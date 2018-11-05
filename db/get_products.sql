select itemid, sku, productname, categoryid, image, ARRAY_AGG(storeid) stores from products
where regionid = $1 and associatetypeid = $2
group by itemid, sku, productname, categoryid, image
order by itemid asc