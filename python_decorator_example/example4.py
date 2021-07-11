class Logger(object):
    def __init__(self, func):
        self.func = func
    def __call__(self, *args, **kwargs):
        print('=>')
        self.func(*args, **kwargs)
        print('<=')

@Logger
def f(a, b):
    print('calling f with args ', (a, b,))

if __name__ == "__main__":
    f(1, 2)