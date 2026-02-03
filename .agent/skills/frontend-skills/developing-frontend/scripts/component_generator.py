import os
import sys

def generate_component(name, path="src/components"):
    print(f"Generating component {name} at {path}...")
    # Placeholder for actual generation logic
    pass

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python component_generator.py <ComponentName>")
    else:
        generate_component(sys.argv[1])
