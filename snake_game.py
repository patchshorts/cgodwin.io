import pygame
import sys
import random

# Initialize pygame
pygame.init()

# Constants
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600
SNAKE_SIZE = 20
SNAKE_SPEED = 15

# Colors
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)

# Setup the game window
window = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption('Snake Game')

# Snake initial settings
snake_position = [100, 50]
snake_body = [[100, 50],
              [90, 50],
              [80, 50]]
direction = 'RIGHT'
change_to = direction

# Food settings
food_position = [random.randrange(1, (WINDOW_WIDTH//SNAKE_SIZE)) * SNAKE_SIZE,
                 random.randrange(1, (WINDOW_HEIGHT//SNAKE_SIZE)) * SNAKE_SIZE]
food_spawn = True

# Set the game clock
clock = pygame.time.Clock()

# Game Over function
def game_over():
    my_font = pygame.font.SysFont('times new roman', 50)
    GO_surface = my_font.render('Your Score is : ' + str(len(snake_body) - 3), True, RED)
    GO_rect = GO_surface.get_rect()
    GO_rect.midtop = (WINDOW_WIDTH/2, WINDOW_HEIGHT/4)
    window.blit(GO_surface, GO_rect)
    pygame.display.flip()
    pygame.time.wait(2000)
    pygame.quit()
    sys.exit()

# Main Function
while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP:
                change_to = 'UP'
            if event.key == pygame.K_DOWN:
                change_to = 'DOWN'
            if event.key == pygame.K_LEFT:
                change_to = 'LEFT'
            if event.key == pygame.K_RIGHT:
                change_to = 'RIGHT'

    # If two keys pressed simultaneously
    if change_to == 'UP' and not direction == 'DOWN':
        direction = 'UP'
    if change_to == 'DOWN' and not direction == 'UP':
        direction = 'DOWN'
    if change_to == 'LEFT' and not direction == 'RIGHT':
        direction = 'LEFT'
    if change_to == 'RIGHT' and not direction == 'LEFT':
        direction = 'RIGHT'

    # Update snake position [x, y]
    if direction == 'UP':
        snake_position[1] -= SNAKE_SIZE
    if direction == 'DOWN':
        snake_position[1] += SNAKE_SIZE
    if direction == 'LEFT':
        snake_position[0] -= SNAKE_SIZE
    if direction == 'RIGHT':
        snake_position[0] += SNAKE_SIZE

    # Snake body growing mechanism
    snake_body.insert(0, list(snake_position))
    if snake_position == food_position:
        food_spawn = False
    else:
        snake_body.pop()
        
    if not food_spawn:
        food_position = [random.randrange(1, (WINDOW_WIDTH//SNAKE_SIZE)) * SNAKE_SIZE,
                         random.randrange(1, (WINDOW_HEIGHT//SNAKE_SIZE)) * SNAKE_SIZE]
    food_spawn = True

    # Game Over conditions
    if snake_position[0] < 0 or snake_position[0] > WINDOW_WIDTH - SNAKE_SIZE:
        game_over()
    if snake_position[1] < 0 or snake_position[1] > WINDOW_HEIGHT - SNAKE_SIZE:
        game_over()

    # Self hit
    for block in snake_body[1:]:
        if snake_position == block:
            game_over()

    # Graphics
    window.fill(WHITE)
    for pos in snake_body:
        pygame.draw.rect(window, GREEN, pygame.Rect(pos[0], pos[1], SNAKE_SIZE, SNAKE_SIZE))
    
    pygame.draw.rect(window, RED, pygame.Rect(food_position[0], food_position[1], SNAKE_SIZE, SNAKE_SIZE))
    
    # Refresh game screen
    pygame.display.update()
    
    # Refresh rate
    clock.tick(SNAKE_SPEED)

