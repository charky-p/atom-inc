import numpy as np
import matplotlib.pyplot as plt
import math as m

# Constants for each generator
# (initial cost, cost multiplier, generation per upgrade)
generators = {
  'Quarks': {'initial_cost': 1, 'multiplier': 1.15, 'generation': 1, 'bonus': 2},
  'Leptons': {'initial_cost': 1000, 'multiplier': 1.3, 'generation': 100, 'bonus': 2},
  'Bosons': {'initial_cost': 1000000, 'multiplier': 2, 'generation': 10000, 'bonus': 2},
}

max_cost = 1e12
scaling = 10
# Function to calculate cost and generation for each generator
def generate_progression(generator_name, initial_cost, multiplier, generation, bonus):
  costs = [initial_cost]
  generations = [0]
  for i in range(1, 1000):  # Simulate up to 50 upgrades for each generator
    cost = initial_cost * (multiplier ** i)
    cost *= bonus ** m.floor(i // 10)
    if cost > max_cost:  # Stop if cost exceeds max limit
      break
    costs.append(cost)
    gen_amt = generation * i
    for _ in range(1, m.floor(i // 10)):
      gen_amt *= (bonus - 1) * m.exp(-scaling * i) + 1
    generations.append(gen_amt)  # Generation increases with each upgrade
  return np.log10(costs), generations  # Return costs and generation for plotting

# Calculate the progression for each generator
x_quarks, y_quarks = generate_progression('Quarks', **generators['Quarks'])
x_leptons, y_leptons = generate_progression('Leptons', **generators['Leptons'])
x_bosons, y_bosons = generate_progression('Bosons', **generators['Bosons'])

print("Costs: ", x_quarks)
print("Generation: ", y_quarks)

# Plotting the results
plt.figure(figsize=(10, 6))
plt.plot(x_quarks, y_quarks, marker='o', label='Quarks', color='b')
plt.plot(x_leptons, y_leptons, marker='x', label='Leptons', color='g')
plt.plot(x_bosons, y_bosons, marker='s', label='Bosons', color='r')

# Adding labels and title
plt.xlabel('Cost')
plt.ylabel('Generation Rate')
plt.title('Progression of Generators: Cost vs. Generation')
plt.legend()
plt.grid(True)

# Show plot
plt.show()
