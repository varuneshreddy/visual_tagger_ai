import redis

class ImageCache:
    def __init__(self, host='localhost', port=6379, db=0):
        self.client = redis.StrictRedis(host=host, port=port, db=db, decode_responses=True)

    def set_cache(self, key, value):
        """Set cache value for a given key."""
        self.client.set(key, value)

    def get_cache(self, key):
        """Get cached value for a given key."""
        return self.client.get(key)

    def clear_cache(self, key):
        """Clear cached value for a given key."""
        self.client.delete(key)