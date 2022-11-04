from flask import Flask, request, redirect, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import func
import os
import random
import string
import logging


app = Flask(__name__, static_folder='build')

db_host = os.environ.get('DB_HOST','localhost')
db_user = os.environ.get('DB_USER', 'bitly')
db_password = os.environ.get('DB_PW', 'bitly')
db_name = os.environ.get('DB_NAME', 'bitly')
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_user}:{db_password}@{db_host}/{db_name}'

db = SQLAlchemy(app)

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

class Url(db.Model):
  id = db.Column(db.String(10), primary_key=True)
  longurl = db.Column(db.String())

with app.app_context():
  pass
  db.create_all()

# Static routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# URL routes
@app.route('/', methods=['POST'])
def add_url():
  try:
    posted_data = request.get_json()
    longUrl = posted_data.get('longUrl', None)
    if longUrl is not None:
      if 'http://' not in longUrl and 'https://' not in longUrl:
        longUrl = f'http://{longUrl}'

      id = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=10))
      db.session.add(Url(id=id, longurl=longUrl))
      db.session.commit()
      shortUrl = f'{request.scheme}://{request.host}/{id}'

      return {
      'longUrl': longUrl,
      'shortUrl': shortUrl
    }, 201

  except Exception as e:
    return f'Error creating url: {e}', 400
  
  return 'Failed to create url', 400

@app.route('/all', methods=['GET'])
def get_all_urls():
  urls = Url.query.all()
  formatted_urls = list()
  for url in urls:
    formatted_urls.append({ 'id': str(url.id), 'longUrl': url.longurl })
  return formatted_urls

@app.route('/random', methods=['GET'])
def get_random_url():
  try:
    url = Url.query.order_by(func.random()).first()
    return redirect(url.longurl)
  except Exception as e:
    return f'Error fetching random URL: {e}', 400

@app.route('/<id>', methods=['GET'])
def get_url_by_id(id):
  try:
    url = Url.query.get(id)
    if url is not None:
      return redirect(url.longurl)
    return f'URL with id {id} not found', 404
  except Exception as e:
    f'Error fetching url: {e}', 400