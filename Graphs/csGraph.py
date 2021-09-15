from turtle import *
import math
import random
import time

def Graph_Gen():
    Gengraph = {}

    nodes = random.randint(1, 100)

    for i in range(0,nodes):
        edges = []
        edge_len = random.randint(0, 4)
        for l in range(0,edge_len):
            edges.append(str(random.randint(1, 100)))
        Gengraph[str(i)] = edges

    return Gengraph

def pos(i):
    y = (i%8)+1
    x = (i//8)+1
    return(x,y)

def undo(x,y):
    return 8*(x-1) + (y-1)

def Moves(x0, y0,dx,dy):
    deltas = [(-dx, -dy), (-dx, +dy), (+dx, -dy), (+dx, +dy), (-dy, -dx), (-dy, +dx), (+dy, -dx), (+dy, +dx)]
    validPositions = []
    for (x, y) in deltas:
        xCandidate = x0 + x
        yCandidate = y0 + y
        if 0 < xCandidate <= 8 and 0 < yCandidate <= 8:
            validPositions.append([xCandidate, yCandidate])

    j = 0
    while j<len(validPositions):
        validPositions[j] = (undo(validPositions[j][0],validPositions[j][1]))
        j = j + 1
    return validPositions

def ChessGraph(dx,dy):
    graph = {}
    i = 0
    while i <64:
        moves = Moves(pos(i)[0],pos(i)[1],dx,dy)
        k = 0
        while k < len(moves):
            moves[k] = str(moves[k])
            k = k + 1
        graph[str(i)] = moves
        i = i + 1
    return graph

def pol2cart(rho, phi):
    #new = phi
    new = math.radians(phi)
    x = rho * math.cos(new)
    y = rho * math.sin(new)
    return(x, y)


def Graph(graph,radius):
    speed(0)
    fillcolor('green')
    vertices = list(graph.keys())
    for i in vertices:
       penup()
       goto(pol2cart(radius,int(i)*(360/len(vertices))))
       begin_fill()
       circle(10)
       end_fill()
       write(str(i))
       for v in graph[str(i)]:
           pendown()
           goto(pol2cart(radius,int(v)*(360/len(vertices))))
           penup()
           goto(pol2cart(radius,int(i)*(360/len(vertices))))
    goto(0,0)



def Multi_Graph(t,radius):


    for i in range(0,t):
        reset()
        Graph(Graph_Gen(),radius)
        time.sleep(5)

def StarGraph(n):
    newgraph = {}
    for i in range(0,n):
         edges = []
         for k in range(0,n):
             edges.append(str(k))
         newgraph[str(i)] = edges
    return newgraph
# Graph(ChessGraph(4,4),200)
Graph(Graph_Gen(),200)
time.sleep(10)
