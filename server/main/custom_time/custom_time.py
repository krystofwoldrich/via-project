import datetime

def get_now_utc_iso_string():
	return datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc).isoformat()
