import asyncio
from aiohttp import ClientSession

urls = {
  "local_get": "http://localhost:3000/apiDocs",
  "staging_get": "https://notes-api-staging.ciscospark.com/apiDocs",
  "local_post": "http://localhost:3000/sessions",
  "staging_post": "https://notes-api-staging.ciscospark.com/sessions"}

async def fetchGet(url, session):
  async with session.get(url) as response:
    await response.read()
    return response

async def fetchPost(url, session):
  async with session.post(url=url, data={"body": {"email": "gg@gg.com", "password": "qazwsx"}}) as response:
    await response.read()
    return response

async def run(url):
  tasks = []
  successfull = 0
  rateLimited = 0
  otherError = 0
  async with ClientSession() as session:
    for i in range(1000):
      #task = asyncio.ensure_future(fetchPost(url, session))
      task = asyncio.ensure_future(fetchGet(url, session))
      tasks.append(task)
    responses = await asyncio.gather(*tasks)
    for res in responses:
      if res.status in (200, 201):
        successfull+=1
      elif res.status == 429:
        rateLimited+=1
      else:
        otherError+=1
    print("success={} rateLimited={} otherError={}".format(successfull, rateLimited, otherError))

loop = asyncio.get_event_loop()
future = asyncio.ensure_future(run(urls['local_get']))
loop.run_until_complete(future)