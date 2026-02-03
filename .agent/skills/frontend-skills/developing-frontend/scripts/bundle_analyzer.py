import sys

def analyze_bundle(path):
    print(f"Analyzing bundle at {path}...")
    # Placeholder for actual analysis logic
    pass

if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "."
    analyze_bundle(path)
