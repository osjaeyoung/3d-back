import bpy
import argparse

'''
ci:
  blender -b -P blender.py -- --ratio 0.5 --inm 'mesh.obj' --outm 'output_mesh.obj'
'''
 
def get_args():
  parser = argparse.ArgumentParser()
 
  # get all script args
  _, all_arguments = parser.parse_known_args()
  double_dash_index = all_arguments.index('--')
  script_args = all_arguments[double_dash_index + 1: ]
 
  # add parser rules
  parser.add_argument('-r', '--ratio', help="Ratio of reduction, Example: 0.5 mean half number of faces ")
  parser.add_argument('-in', '--inm', help="Original Model")
  parser.add_argument('-out', '--outm', help="Decimated output file")
  parsed_script_args, _ = parser.parse_known_args(script_args)
  return parsed_script_args
 
args = get_args()
decimateRatio = float(args.ratio)
print(decimateRatio)

input_model = str(args.inm)
print(input_model)

output_model = str(args.outm)
print(output_model)

print('\n Clearing blender scene (default garbage...)')
# deselect all
bpy.ops.object.select_all(action='DESELECT')

# selection
bpy.data.objects['Camera'].select_set(True)

# remove it
bpy.ops.object.delete() 

# Clear Blender scene
# select objects by type
for o in bpy.data.objects:
    if o.type == 'MESH':
        o.select_set(True)
    else:
        o.select_set(False)

# call the operator once
bpy.ops.object.delete()

print('\n Beginning the process of Decimation using Blender Python API ...')
bpy.ops.wm.obj_import(filepath=input_model)
print('\n Obj file imported successfully ...')
modifierName='DecimateMod'

print('\n Creating and object list and adding meshes to it ...')
objectList=bpy.data.objects
meshes = []
for obj in objectList:
  if(obj.type == "MESH"):
    meshes.append(obj)

print("{} meshes".format(len(meshes)))

result = []
for i, obj in enumerate(meshes):
  bpy.context.view_layer.objects.active = obj
  original = {'vertex':len(obj.data.vertices), 'edge':len(obj.data.edges), 'polygon':len(obj.data.polygons)}

  print("{}/{} meshes, name: {}".format(i, len(meshes), obj.name))
  print("{} has {} verts, {} edges, {} polys".format(obj.name, original['vertex'], original['edge'], original['polygon']))

  modifier = obj.modifiers.new(modifierName,'DECIMATE')
  modifier.ratio = decimateRatio
  modifier.use_collapse_triangulate = True
  bpy.ops.object.modifier_apply(modifier=modifierName)

  to = {'vertex':len(obj.data.vertices), 'edge':len(obj.data.edges), 'polygon':len(obj.data.polygons)}
  print("{} has {} verts, {} edges, {} polys after decimation".format(obj.name, to['vertex'], to['edge'], to['polygon']))

  result.append({'from':original,'to':to})

bpy.ops.wm.obj_export(filepath=output_model)
print('\n Process of Decimation Finished ...')
print('result {}'.format(result))